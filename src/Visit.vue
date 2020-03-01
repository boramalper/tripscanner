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
                            <td>Carrier: </td>
                            <td>{{ this.flight.carrierId }}</td>
                        </tr>
                        <tr>
                            <td>Emission: </td>
                            <td>{{ this.flight.emission }}</td>
                        </tr>
                        <tr>
                            <td>Price: </td>
                            <td>{{ this.flight.price }}</td>
                        </tr>
                    </table>
                </b-card>
            </b-col>
            <b-col>
                <b-card>
                    <b>Stations:</b>
                    <ol>
                        <li
                            v-for="leg of legs"
                            :key="leg.id"
                        >{{ leg.origin.name }}</li>
                        <li
                            v-if="this.legs.length >= 1"
                        >{{ this.legs[this.legs.length - 1].destination.name }}</li>
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
            const fromUrl = new URL("http://127.0.0.1:3000/api/stations");
            fromUrl.searchParams.append("query", `${this.fromDict.name} ${this.fromDict.country}`);
            fetch(fromUrl)
                .then(res => res.json())
                .then(doc => {
                    const toUrl = new URL("http://127.0.0.1:3000/api/stations");
                    toUrl.searchParams.append("query", `${this.toDict.name} ${this.toDict.country}`);
                    fetch(toUrl)
                        .then(res => res.json())
                        .then(doc2 => {
                            const url = `http://127.0.0.1:3000/api/journeys?from=${doc[0].id}&to=${doc2[0].id}&date=2020-03-05`;
                            fetch(url)
                                .then(res => res.json())
                                .then(doc => {
                                    this.legs = doc[0].legs;
                                    console.log("DOC", doc[0].legs);
                                });
                        })
                })
        },

        methods: {},
    }
</script>

<style scoped>
    td:nth-child(1) {
        font-weight: bold;
    }
</style>

