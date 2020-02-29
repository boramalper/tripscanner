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
                <b-form-input type="number" min="1"></b-form-input>
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
            }
        },

        methods: {
            mySearch() {
                console.log(this.query);
                this.options = this.search(this.query).slice(0, 5);
            },

            cityClick(e) {
                console.log("!!!", e.target.id);
                this.activeKey = e.target.id;
            }
        },
    }
</script>

<style scoped>
</style>

