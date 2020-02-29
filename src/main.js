import Vue from 'vue'

import App from "./App"
import ResultsApp from "./ResultsApp"
import CityPicker from "./CityPicker";
import Visit from "./Visit"

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
    Vue.component("Visit", Visit);

    const router = new VueRouter({
        routes: [
            {path: "/", name:"home", component: App, props: {fuse: fuse}},
            {path: '/results', name:"results", component: ResultsApp, props: true},
        ],
    });

    Vue.config.productionTip = false;

    new Vue({
        el: '#app',
        router,
        components: { App }
    })

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
