const {
  createStore,
  getStore,
  updateStore,
  updateStoreRegion,
  updateStorePassword,
  getManage,
  checkUsername,
} = require("./store.controller");

module.exports = function (instance, opts, next) {
  instance.post("/createStore", {
    preHandler: instance.auth(
      [instance.hasRole("branch"), instance.deleteUserInfo()],
      {
        relation: "and",
      }
    ),
    handler: createStore,
  });

  instance.post("/fetchStore", {
    handler: getStore,
    preHandler: instance.auth([
      instance.hasRole("store", "branch", "distributor", "head", "rider"),
    ]),
  });

  instance.post("/updateStore", {
    handler: updateStore,
    preHandler: instance.auth([
      instance.hasRole("branch", "head", "distributor"),
    ]),
  });

  // region 가맹점 관할구역 설정
  instance.post("/updateStore/region", {
    handler: updateStoreRegion,
    preHandler: instance.auth([instance.hasRole("store")]),
  });
  // endregion

  // region 가맹점 비밀번호 변경
  instance.post("/updateStore/password", {
    handler: updateStorePassword,
    preHandler: instance.auth([instance.hasRole("store")]),
  });
  // endregion

  // region 가맹점 관리비
  // endregion

  /**
   * @wpiRoute /v2/store/username [post]
   * @wpiDescription 가맹점 아이디 체크
   * @wpiSuccess {string} message 메세지
   * @wpiSuccess {int} statusCode 상태코드
   * @wpiSuccess {string} data 완료 메세지
   */
  // region 라이더 username 확인
  instance.post("/username", {
    preHandler: instance.auth([
      instance.hasRole("head", "distributor", "branch"),
    ]),
    handler: checkUsername,
  });
  // endregion

  next();
};
