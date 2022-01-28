const bcrypt = require("bcrypt");

class StoreBuilder {
  constructor() {
    this.store = {
      address: {},
      manage: {},
      extraFee: {},
      virtualAccount: {},
      realAccount: {},
    };
  }

  addId(_id) {
    this.store._id = _id;
    return this;
  }

  addDistributorId(distributorId) {
    this.store.distributorId = distributorId;
    return this;
  }

  addBranchId(branchId) {
    this.store.branchId = branchId;
    return this;
  }

  addStoreName(storeName) {
    this.store.storeName = storeName;
    return this;
  }

  addUsername(usernameStore) {
    this.store.username = usernameStore;
    return this;
  }

  addPassword(passwordStore) {
    this.store.password = bcrypt.hashSync(passwordStore, 8);
    return this;
  }

  addEmail(email) {
    this.store.email = email;
    return this;
  }

  addStatus(status) {
    this.store.status = status;
    return this;
  }

  addDeliveryStatus(deliveryStatus) {
    this.store.deliveryStatus = deliveryStatus;
    return this;
  }

  addBusinessNumber(businessNumber) {
    this.store.businessNumber = businessNumber;
    return this;
  }

  addStoreType(storeType) {
    this.store.storeType = storeType;
    return this;
  }

  addStorePhone(storePhone) {
    this.store.storePhone = storePhone;
    return this;
  }

  addOwnerName(ownerName) {
    this.store.ownerName = ownerName;
    return this;
  }

  addOwnerBirth(ownerBirth) {
    this.store.ownerBirth = ownerBirth;
    return this;
  }

  addOwnerPhone(ownerPhone) {
    this.store.ownerPhone = ownerPhone;
    return this;
  }

  addAddress(address) {
    this.store.address = address;
    return this;
  }

  addOpenAt(openAt) {
    this.store.openAt = openAt;
    return this;
  }

  addCloseAt(closeAt) {
    this.store.closeAt = closeAt;
    return this;
  }

  addDefaultOrderMessage(defaultOrderMessage = "") {
    this.store.defaultOrderMessage = defaultOrderMessage;
    return this;
  }

  addOrderColor(orderColor = "") {
    this.store.orderColor = orderColor;
    return this;
  }

  addTaxInvoice(taxInvoice) {
    this.store.taxInvoice = taxInvoice;
    return this;
  }

  addMemo(memo = "") {
    this.store.memo = memo;
    return this;
  }

  addManage(manage = []) {
    this.store.manage = [...manage];
    return this;
  }

  addMustInputCustomerPhone(mustInputCustomerPhone) {
    this.store.mustInputCustomerPhone = mustInputCustomerPhone;
    return this;
  }

  addEasyOrder(easyOrder) {
    this.store.easyOrder = easyOrder;
    return this;
  }

  addDirectRequestOrder(directRequestOrder) {
    this.store.directRequestOrder = directRequestOrder;
    return this;
  }

  addLimitOrderType(limitOrderType, maxOrders) {
    this.store.limitOrderType = limitOrderType;
    if (limitOrderType !== 0) {
      this.store.maxOrders = maxOrders;
    } else {
      this.store.maxOrders = 0;
    }
    return this;
  }

  addCancelPosition(cancelPosition) {
    this.store.cancelPosition = cancelPosition;
    return this;
  }

  addOrderDelayTime(orderDelayTime) {
    this.store.orderDelayTime = orderDelayTime;
    return this;
  }

  addMinArriveTime(minArriveTime, minArriveTimeSelect) {
    this.store.minArriveTime = minArriveTime;
    this.store.minArriveTimeSelect = minArriveTimeSelect;
    return this;
  }

  addDefaultDeliveryPrice(defaultDeliveryPrice, extraFee) {
    this.store.defaultDeliveryPrice = defaultDeliveryPrice;
    this.store.extraFee.defaultDeliveryPrice = [
      {
        baseDistanceRange: 0,
        basePrice: 0,
        overDistance: 0,
        overDistanceFee: 0,
      },
      {
        overDistance: 0,
        overDistanceFee: 0,
        baseDistanceRange: 0,
        list: [],
      },
      {
        basePrice: 0,
        list: [],
      },
    ];

    const target =
      this.store.extraFee.defaultDeliveryPrice[defaultDeliveryPrice];

    switch (defaultDeliveryPrice) {
      case 0:
        target.baseDistanceRange =
          extraFee.defaultDeliveryPrice[defaultDeliveryPrice].baseDistanceRange;
        target.basePrice =
          extraFee.defaultDeliveryPrice[defaultDeliveryPrice].basePrice;
        target.overDistance =
          extraFee.defaultDeliveryPrice[defaultDeliveryPrice].overDistance;
        target.overDistanceFee =
          extraFee.defaultDeliveryPrice[defaultDeliveryPrice].overDistanceFee;
        break;
      case 1:
        target.overDistance =
          extraFee.defaultDeliveryPrice[defaultDeliveryPrice].overDistance;
        target.overDistanceFee =
          extraFee.defaultDeliveryPrice[defaultDeliveryPrice].overDistanceFee;
        target.baseDistanceRange =
          extraFee.defaultDeliveryPrice[defaultDeliveryPrice].baseDistanceRange;
        target.list = [
          ...extraFee.defaultDeliveryPrice[defaultDeliveryPrice].list,
        ];
        break;
      case 2:
        target.basePrice =
          extraFee.defaultDeliveryPrice[defaultDeliveryPrice].basePrice;
        target.list = [
          ...extraFee.defaultDeliveryPrice[defaultDeliveryPrice].list,
        ];
        break;
      default:
        break;
    }

    return this;
  }

  addExtraFeeSelect(extraFeeSelect, extraFee) {
    this.store.extraFeeSelect = extraFeeSelect;
    this.store.extraFee.cold = extraFee.cold;
    this.store.extraFee.frozen = extraFee.frozen;
    this.store.extraFee.holiday = extraFee.holiday;
    this.store.extraFee.hot = extraFee.hot;
    this.store.extraFee.night = extraFee.night;
    this.store.extraFee.rain = extraFee.rain;
    this.store.extraFee.snow = extraFee.snow;
    this.store.extraFee.weekend = extraFee.weekend;
    return this;
  }

  addIsPG(isPG) {
    this.store.isPG = isPG;
    return this;
  }

  addCatId(catId) {
    this.store.catId = catId;
    return this;
  }

  addVAN(van) {
    this.store.van = van;
    return this;
  }

  addPlatforms(platforms) {
    this.store.platforms = [...platforms];
    return this;
  }

  addStartAt(startAt) {
    this.store.startAt = startAt;
    return this;
  }

  addExpireAt(expireAt) {
    this.store.expireAt = expireAt;
    return this;
  }

  addVirtualAccountId(virtualAccount_id) {
    this.store.virtualAccount.virtualAccount_id = virtualAccount_id;
    return this;
  }

  addVirtualAccountUseCash(useCash) {
    this.store.virtualAccount.useCash = useCash;
    return this;
  }

  addVirtualAccountWarnCashType(warnCashType, warnCash) {
    this.store.virtualAccount.warnCashType = warnCashType;
    this.store.virtualAccount.warnCash = warnCash;

    return this;
  }

  addVirtualAccountMinCashType(minCashType, minCash) {
    this.store.virtualAccount.minCashType = minCashType;
    this.store.virtualAccount.minCash = minCash;
    return this;
  }

  addLimitWhenCash(limitWhenCash) {
    this.store.limitWhenCash = limitWhenCash;
    return this;
  }

  addVirtualAccountUseCommission(virtualAccount) {
    this.store.virtualAccount.useCommission = virtualAccount.useCommission;
    if (virtualAccount.useCommission) {
      this.store.virtualAccount.commissionPrice =
        virtualAccount.commissionPrice;
      this.store.virtualAccount.commission = virtualAccount.commission;
      this.store.virtualAccount.depositCommission =
        virtualAccount.depositCommission;
      this.store.virtualAccount.withdrawCommission =
        virtualAccount.withdrawCommission;
    } else {
      this.store.virtualAccount.commissionPrice = 0;
      this.store.virtualAccount.commission = 0;
      this.store.virtualAccount.depositCommission = 0;
      this.store.virtualAccount.withdrawCommission = 0;
    }
    return this;
  }

  addFeeAt(feeAt) {
    this.store.feeAt = feeAt;
    return this;
  }

  addFixAt(fixAt) {
    this.store.fixAt = fixAt;
    return this;
  }

  addRealAccount(realAccount) {
    this.store.realAccount = { ...realAccount };
    return this;
  }

  build() {
    return this.store;
  }
}

module.exports = { StoreBuilder };
