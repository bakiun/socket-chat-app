/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";
import axios from "axios";
// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

axios.defaults.baseURL = process.env.API_URI;
const app = createApp(App);

registerPlugins(app);

app.mount("#app");
