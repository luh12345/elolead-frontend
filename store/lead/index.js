import client from "../../common/apiClient";

export const state = () => ({
  items: []
});

export const mutations = {
  setLeads(state, items) {
    state.items = items;
  }
};

export const actions = {
  getLeads({}, model) {
    return client.get(
      `leads?CustomerName=${model.name}&CustomerEmail=${model.email}&StatusId=${model.status}`
    );
  },
  createLead({}, model) {
    return client.post("leads", {
      CustomerName: model.name,
      CustomerPhone: model.phone,
      CustomerEmail: model.email
    });
  },
  editLead({}, model) {
    return client.put("leads", {
      Id: model.id,
      CustomerName: model.name,
      CustomerPhone: model.phone,
      CustomerEmail: model.email,
      Opportunity: model.opportunity
    });
  },
  discard({}, model) {
    return client.post("leads/discard", {
      Id: model.id
    });
  },
  startQualification({}, model) {
    return client.post("leads/startQualification", {
      Id: model.id
    });
  }
};
