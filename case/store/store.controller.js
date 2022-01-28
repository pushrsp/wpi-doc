const { STORE, VIRTUAL_ACCOUNT } = require("@gonggam/core").Models;
const {
  ROLE_FACTORY,
  VIRTUAL_ACCOUNT_SELECT,
  DISTRIBUTOR_SELECT,
  SHARE_BRANCH_SELECT,
} = require("@gonggam/core").Factory;

const { StoreBuilder } = require("./store.builder");

async function createStore(req, reply) {
  const { distributorId, _id } = req.me;
  const body = req.body;

  if (await STORE.exists({ username: body.usernameStore })) {
    return this.httpErrors.conflict("이미 가입된 계정입니다.");
  }

  const accountPacket = this.ksnet.packetMapper();

  try {
    this.ksnet.makeAccount(accountPacket, async function (data) {
      const va = await VIRTUAL_ACCOUNT.create({
        ...data,
        taken: true,
        taken_role: ROLE_FACTORY.STORE,
      });

      const store = new StoreBuilder()
        .addDistributorId(distributorId._id)
        .addBranchId(_id)
        .addStoreName(body.storeName)
        .addFeeAt(body.feeAt)
        .addUsername(body.usernameStore)
        .addPassword(body.passwordStore)
        .addEmail(body.email)
        .addStatus(body.status)
        .addDeliveryStatus(body.deliveryStatus)
        .addBusinessNumber(body.businessNumber)
        .addStoreType(body.storeType)
        .addStorePhone(body.storePhone)
        .addOwnerName(body.ownerName)
        .addOwnerBirth(body.ownerBirth)
        .addOwnerPhone(body.ownerPhone)
        .addAddress(body.address)
        .addOpenAt(body.openAt)
        .addCloseAt(body.closeAt)
        .addDefaultOrderMessage(body.defaultOrderMessage)
        .addOrderColor(body.orderColor)
        .addTaxInvoice(body.taxInvoice)
        .addMemo(body.memo)
        .addManage(body.manage)
        .addMustInputCustomerPhone(body.mustInputCustomerPhone)
        .addEasyOrder(body.easyOrder)
        .addDirectRequestOrder(body.directRequestOrder)
        .addLimitOrderType(body.limitOrderType, body.maxOrders)
        .addCancelPosition(body.cancelPosition)
        .addOrderDelayTime(body.orderDelayTime)
        .addMinArriveTime(body.minArriveTime, body.minArriveTimeSelect)
        .addDefaultDeliveryPrice(body.defaultDeliveryPrice, body.extraFee)
        .addExtraFeeSelect(body.extraFeeSelect, body.extraFee)
        .addIsPG(body.isPG)
        .addCatId(body.catId)
        .addVAN(body.van)
        .addPlatforms(body.platforms)
        .addStartAt(body.startAt)
        .addExpireAt(body.expireAt)
        .addVirtualAccountId(va._id)
        .addVirtualAccountUseCash(body.virtualAccount.useCash)
        .addVirtualAccountWarnCashType(
          body.virtualAccount.warnCashType,
          body.virtualAccount.warnCash
        )
        .addVirtualAccountMinCashType(
          body.virtualAccount.minCashType,
          body.virtualAccount.minCash
        )
        .addLimitWhenCash(body.limitWhenCash)
        .addVirtualAccountUseCommission(body.virtualAccount)
        // .addRealAccount(body.realAccount)
        .build();

      const newStore = await STORE.create(store);

      await VIRTUAL_ACCOUNT.updateOne(
        { _id: va._id },
        { taken_id: newStore._id }
      );

      reply.success(newStore._id);
    });
  } catch (e) {
    this.httpErrors.serviceUnavailable(e.message);
  }
}

async function getStore(req, reply) {
  const { text, option, status } = req.body;
  const { role, _id } = req.me;

  const StoreQuery = STORE.find()
    .populate({
      path: "distributorId",
      select: DISTRIBUTOR_SELECT,
    })
    .populate({
      path: "virtualAccount.virtualAccount_id",
      select: VIRTUAL_ACCOUNT_SELECT,
    })
    .populate({ path: "branchId", select: SHARE_BRANCH_SELECT });

  switch (role) {
    case "distributor":
      StoreQuery.where("distributorId").equals(_id);
      break;
    case "branch":
      StoreQuery.where("branchId").equals(_id);
      break;
    case "store":
      StoreQuery.where("_id").equals(_id);
      break;
    default:
      break;
  }

  if (text) {
    StoreQuery.where(option, { $regex: text });
  }

  if (status && status !== "전체") {
    StoreQuery.where("status").equals(status);
  }

  const stores = await StoreQuery.select("-password").exec();

  reply.success(stores);
}

async function updateStore(req, reply) {
  let store = req.body;

  store = new StoreBuilder()
    .addId(store._id)
    .addDistributorId(store.distributorId._id)
    .addBranchId(store.branchId._id)
    .addVirtualAccountId(store.virtualAccount.virtualAccount_id)
    .addStoreName(store.storeName)
    .addUsername(store.usernameStore)
    .addEmail(store.email)
    .addStatus(store.status)
    .addDeliveryStatus(store.deliveryStatus)
    .addBusinessNumber(store.businessNumber)
    .addStoreType(store.storeType)
    .addStorePhone(store.storePhone)
    .addOwnerName(store.ownerName)
    .addOwnerBirth(store.ownerBirth)
    .addOwnerPhone(store.ownerPhone)
    .addAddress(store.address)
    .addOpenAt(store.openAt)
    .addCloseAt(store.closeAt)
    .addDefaultOrderMessage(store.defaultOrderMessage)
    .addOrderColor(store.orderColor)
    .addTaxInvoice(store.taxInvoice)
    .addMemo(store.memo)
    .addManage(store.manage)
    .addMustInputCustomerPhone(store.mustInputCustomerPhone)
    .addEasyOrder(store.easyOrder)
    .addDirectRequestOrder(store.directRequestOrder)
    .addLimitOrderType(store.limitOrderType, store.maxOrders)
    .addCancelPosition(store.cancelPosition)
    .addOrderDelayTime(store.orderDelayTime)
    .addMinArriveTime(store.minArriveTime, store.minArriveTimeSelect)
    .addDefaultDeliveryPrice(store.defaultDeliveryPrice, store.extraFee)
    .addExtraFeeSelect(store.extraFeeSelect, store.extraFee)
    .addIsPG(store.isPG)
    .addCatId(store.catId)
    .addVAN(store.van)
    .addPlatforms(store.platforms)
    .addStartAt(store.startAt)
    .addExpireAt(store.expireAt)
    .addVirtualAccountUseCash(store.virtualAccount.useCash)
    .addVirtualAccountWarnCashType(
      store.virtualAccount.warnCashType,
      store.virtualAccount.warnCash
    )
    .addVirtualAccountMinCashType(
      store.virtualAccount.minCashType,
      store.virtualAccount.minCash
    )
    .addFeeAt(store.feeAt)
    .addLimitWhenCash(store.limitWhenCash)
    .addVirtualAccountUseCommission(store.virtualAccount)
    .addFixAt(new Date())
    // .addRealAccount(store.realAccount)
    .build();

  const virtualAccount = { ...store.virtualAccount };
  delete store.virtualAccount;

  await STORE.updateOne(
    { _id: store._id },
    {
      $set: {
        ...store,
        "virtualAccount.useCommission": virtualAccount.useCommission,
        "virtualAccount.commissionPrice": virtualAccount.commissionPrice,
        "virtualAccount.commission": virtualAccount.commission,
        "virtualAccount.depositCommission": virtualAccount.depositCommission,
        "virtualAccount.withdrawCommission": virtualAccount.withdrawCommission,
        "virtualAccount.minCashType": virtualAccount.minCashType,
        "virtualAccount.minCash": virtualAccount.minCash,
        "virtualAccount.warnCashType": virtualAccount.warnCashType,
        "virtualAccount.warnCash": virtualAccount.warnCash,
        "virtualAccount.virtualAccount_id": virtualAccount.virtualAccount_id,
        "virtualAccount.useCash": virtualAccount.useCash,
      },
    }
  );
  reply.success("");
}

async function updateStoreRegion(req, reply) {
  const { _id } = req.me;
  const { region } = req.body;

  await STORE.updateOne({ _id }, { region });
  reply.success(region);
}

async function updateStorePassword(req, reply) {
  const { _id } = req.me;
  const { password } = req.body;

  await STORE.updateOne({ _id }, { password: this.bcryptPassword(password) });

  reply.success("");
}

async function getManage(req, reply) {
  const {} = req.me;
}

async function checkUsername(req, reply) {
  const { usernameStore } = req.body;

  const ex = await STORE.exists({ username: usernameStore });
  if (ex) {
    return this.httpErrors.conflict("이미 가입된 유저입니다.");
  } else {
    reply.success("생성 가능한 유저입니다.");
  }
}

module.exports = {
  createStore,
  getStore,
  updateStore,
  updateStoreRegion,
  updateStorePassword,
  getManage,
  checkUsername,
};
