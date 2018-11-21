const state = {
    documents : {}
}

const mutations = {
    setDocuments: (state, d) => {
        state.documents = d;
    }
}

const getters = {
    allDocuments: (state) => {
        return state.documents;
    }
}

export default {
    state,
    mutations,
    getters
}