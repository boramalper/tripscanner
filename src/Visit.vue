<template>
    <div>
        <b-row>
            <b-col><h4>EDI - IST</h4></b-col>
        </b-row>
        <b-row style="margin-bottom: 0.5em">
            <b-col>
                <b-card>flight</b-card>
            </b-col>
            <b-col>
                <b-card>train</b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        props: [
            "title",

            /*
            {
                flightNo,
                price,
                carbonEmission
            }
             */
            "flights",

            /*
            {
                trainNo,
                price,
            }
             */
            "trains",
        ],

        data() {
            return {}
        },

        methods: {},

        mounted() {
        }
    }
</script>

<style scoped>
</style>

