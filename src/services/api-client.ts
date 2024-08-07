import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "650468153ed24626a34a93a0f4931949",
  },
});
