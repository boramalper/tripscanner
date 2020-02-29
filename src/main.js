import Vue from 'vue'

import App from "./App"
import ResultsApp from "./ResultsApp"
import CityPicker from "./CityPicker";

import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'


(async function () {
    const HOST = "http://localhost:8080";
    let cities = null;
    let fuse = null;

    const res = await fetch(HOST + "/static/assets/cities.json");
    cities = await res.json();
    fuse = new Fuse(cities, {
        keys: ["name"],
        shouldSort: true,
    });

    Vue.use(VueRouter);
    Vue.use(BootstrapVue);

    Vue.component("CityPicker", CityPicker);

    const router = new VueRouter({
        mode: "history",
        routes: [
            {path: "/", name:"home", component: App},
            {path: '/results', name:"resuls", component: ResultsApp},
        ],
    });

    Vue.config.productionTip = false;

    new Vue({
        render: h => h(App),
        router,
        components: {App}
    }).$mount('#app')

    //
    // const v = new Vue({
    //     el: "#app",
    //     render: h => h(App, {
    //         props: {
    //             fuse: fuse,
    //         },
    //     }),
    // });
})();
