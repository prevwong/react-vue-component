import documents from "./documents";
import notes from "./notes";
import Reactx from "../../src/index";

export default new Reactx.Store({
    modules: {
        documents,
        notes
    }
})