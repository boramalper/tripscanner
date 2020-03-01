<template>
    <b-card>
        <b-input-group class="mt-3">
            <b-form-input v-model="query"></b-form-input>
            <b-input-group-append>
                <b-button variant="info" v-on:click="mySearch">Search</b-button>
            </b-input-group-append>
        </b-input-group>
        <br/>
        <b-list-group>
            <b-list-group-item
                    v-for="option in this.options"
                    :name="option.name"
                    :country="option.country"
                    :iata="option.iata"
                    :id="option.name + ',' +  option.country"
                    :key="option.name + ',' +  option.country"
                    v-on:click="cityClick"
                    :active="activeKey === option.name + ',' +  option.country"
            >
                {{option.name}}, {{option.country}}
            </b-list-group-item>
        </b-list-group>
        <div v-if="!this.hideDays">
            <br/>
            <b-input-group prepend="Number of Days" class="mt-3">
                <b-form-input type="number" min="1" v-model="days"></b-form-input>
            </b-input-group>
        </div>
    </b-card>
</template>

<script>
    export default {
        props: [
            "search",
            "hideDays",
        ],

        data() {
            return {
                "query": "",
                "options": [],
                "activeKey": "",
                "name": "",
                "country": "",
                "iata": "",
                "days": "",
            }
        },

        methods: {
            mySearch() {
                this.options = this.search(this.query).slice(0, 5);
            },

            cityClick(e) {
                this.activeKey = e.target.id;

                this.name = e.target.getAttribute("name");
                this.country = e.target.getAttribute("country");
                this.iata = e.target.getAttribute("iata");
            }
        },
    }
</script>

<style scoped>
</style>

