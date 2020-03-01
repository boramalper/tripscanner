<template>
    <div>
        <b-row>
            <b-col><h4>{{ this.from }} - {{ this.to }}</h4></b-col>
        </b-row>
        <b-row style="margin-bottom: 0.5em">
            <b-col>
                <b-card>
                    <table>
                        <tr>
                            <td>Carrier:</td>
                            <td>{{ this.flight.carrierId }}</td>
                        </tr>
                        <tr>
                            <td>Emission:</td>
                            <td>{{ this.flight.emission }}</td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td>{{ this.flight.price }}</td>
                        </tr>
                    </table>
                </b-card>
            </b-col>
            <b-col>
                <b-card>
                    <p><b>Departure:</b><br />{{ this.legs[0].departure }}</p>

                    <p><b>Total Time:</b><br />{{  }}</p>

                    <b>Stations:</b>
                    <ol>
                        <li
                                v-for="leg of legs"
                                :key="leg.id"
                        >{{ leg.origin.name }} ({{ (leg.duration / 3600000).toFixed(1) }}h)
                        </li>
                        <li
                                v-if="this.legs.length >= 1"
                        >{{ this.legs[this.legs.length - 1].destination.name }} ({{ (this.legs[this.legs.length - 1].duration / 3600000).toFixed(1) }}h)
                        </li>
                    </ol>

                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        props: [
            "from",
            "to",

            "fromDict",
            "toDict",

            "flight",
            "train",
        ],

        data() {
            return {
                legs: [],
            }
        },

        mounted() {
            (async () => {
                const fromUrl = new URL("http://127.0.0.1:3000/api/stations");
                fromUrl.searchParams.append("query", `${this.fromDict.name} ${this.fromDict.country}`);
                const fromRes = await fetch(fromUrl);
                const fromDoc = await fromRes.json();

                const toUrl = new URL("http://127.0.0.1:3000/api/stations");
                toUrl.searchParams.append("query", `${this.toDict.name} ${this.toDict.country}`);
                const toRes = await fetch(toUrl);
                const toDoc = await toRes.json();

                const url = `http://127.0.0.1:3000/api/journeys?from=${fromDoc[0].id}&to=${toDoc[0].id}&date=2020-03-05`;
                const res = await fetch(url);
                const doc = await res.json();
                this.legs = doc[0].legs;

                for (let leg of this.legs) {
                    leg.duration = new Date(leg.arrival) - new Date(leg.departure);
                }
            })()
                .then()
                .catch(console.error);
        },

        methods: {},
    }
</script>

<style scoped>
    td:nth-child(1) {
        font-weight: bold;
    }
</style>

