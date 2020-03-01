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
                                :flight="visit.flight"
                                :from="visit.from"
                                :to="visit.to"
                                :fromDict="visit.fromDict"
                                :toDict="visit.toDict"
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
                "itinerary": []
            }
        },

        mounted() {
            function uuidv4gen() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }

            new Promise((resolve => setTimeout(resolve, 1000))).then(_ => {
                this.loading = false;
            });

            const url = new URL("http://127.0.0.1:5000/");
            // http://127.0.0.1:5000/?start_iata=EDI&start_date=2020-03-10&visit=STN&day=5&visit=FRA&day=10
            url.searchParams.append("start_iata", this.from.iata);
            url.searchParams.append("start_date", this.startDate);
            for (let visit of this.visits) {
                url.searchParams.append("visit", visit.iata);
                url.searchParams.append("day", visit.days);
            }

            let codes = [this.from];
            codes.push(...this.visits);
            codes.push(this.from);

            const itinerary = this.itinerary;
            fetch(url)
                .then(res => res.json())
                .then(doc => {
                    console.log("!!!", doc);

                    let i = 0;
                    for (let trip of doc) {
                        itinerary.push({
                            id: uuidv4gen(),
                            flight: trip,
                            from: codes[i].iata,
                            to: codes[i + 1].iata,

                            fromDict: codes[i],
                            toDict: codes[i + 1]
                        });
                        i++;
                    }
                });
            console.log(this.startDate, this.from, this.visits);
        },

        methods: {
        },
    }
</script>

<style scoped>
</style>

