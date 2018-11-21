const state = {
    noteFiles : {}
}

const mutations = {
    setDocuments: (state, d) => {
        state.noteFiles = d;
    }
}

const getters = {
    allNotes: (state) => {
        return state.noteFiles;
    }
}

export default {
    state,
    mutations,
    getters
}