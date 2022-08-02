const state = () => ({
  showLoader: Boolean,
  charges: [],
});

const mutations = {
  ["GET_CHARGES"](state) {
    state.showLoader = true;
  },
  ["GET_CHARGES_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.charges = payload.data.pageItems;
  },
  ["GET_CHARGES_FAIL"](state) {
    state.showLoader = false;
  },
  ["GET_CHARGES_ERROR"](state) {
    state.showLoader = false;
  },
};

const actions = {
  async _getcharges({ commit }, clientId) {
    commit("GET_CHARGES");
    await this.$api
      .get(`clients/${clientId}/charges`)
      .then((response) => {
        response.data.pageItems.forEach((el) => console.table(el));
        commit("GET_CHARGES_SUCCESS", response);
      })
      .catch((err) => {
        console.log(err);
        commit("GET_CHARGES_ERROR");
      });
  },
};

const getters = {
  charges: function (state) {
    // console.log(state.charges);
    return state.charges.map((charge) => ({
      status: charge.isPaid ? "Paid" : "Not paid",
      name: charge.name,
      dueAsOf: charge.dueDate,
      due: charge.amount,
      paid: charge.amountPaid,
      waived: charge.amountWaived,
      outstanding: charge.amountOutstanding,
    }));
  },
};

export default {
  namespaced: false,
  state,
  actions,
  getters,
  mutations,
};
