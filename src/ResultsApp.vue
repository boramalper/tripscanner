<template>
    <div>
        <nav class="navbar navbar-dark bg-dark">
            <span class="navbar-brand mb-0 h1">Tripscanner</span>
        </nav>
        <br/>

        <main>
            <div class="container-fluid">
                <center v-if="this.loading">
                    <img src="/static/images/loading.gif" width="64" height="64"/>
                    <p>Loading the most environmentally friendly offers for you!</p>
                </center>
                <div v-else>
                    <h2>Itinerary</h2>
                    <b-container>
                        <b-row>
                            <b-col><center><h3>Flight</h3></center></b-col>
                            <b-col><center><h3>Train</h3></center></b-col>
                        </b-row>
                        <Visit
                                v-for="visit in this.itinerary"
                                :key="visit.id"
                        />
                    </b-container>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    export default {
        props: [
            "startDate",
            "from",
            "visits",  // [city, days]
        ],

        data() {
            return {
                "loading": true,
                "itinerary": [{"id": 1}, {id: 3}]
            }
        },

        methods: {},

        mounted() {
            new Promise((resolve => setTimeout(resolve, 1000))).then(_ => {
                this.loading = false;
            });

            console.log(this.startDate, this.from, this.visits);

        }
    }
</script>

<style scoped>
</style>

