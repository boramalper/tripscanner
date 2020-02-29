<template>
    <div>
        <nav class="navbar navbar-dark bg-dark">
            <span class="navbar-brand mb-0 h1">Tripscanner</span>
        </nav>
        <br/>

        <main>
            <div class="container-fluid">
                <h2>From</h2>
                <b-form-datepicker v-model="startDate" class="mb-2"></b-form-datepicker>
                <CityPicker
                        ref="from"
                        :search="this.search"
                        :hideDays="true"
                ></CityPicker>

                <h2>Cities</h2>
                <div id="cityPickers">
                    <CityPicker
                            v-for="cityPicker in this.cityPickers"
                            ref="hops"
                            :key="cityPicker.uuid"
                            :search="search"
                            :hideDays="false"
                    />
                </div>
            </div>

            <br/>
            <div class="container-fluid">
                <div id="buttons">
                    <b-button variant="success" v-on:click="appendCityPicker">Add More</b-button>
                    <b-button variant="primary" v-on:click="next">Search Trips!</b-button>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    export default {
        props: [
            "fuse",
        ],
        data() {
            return {
                "startDate": "",
                "cityPickers": [],
            }
        },
        methods: {
            search(query) {
                return this.fuse.search(query);
            },

            next() {
                let visits = [];
                for (let i = 0; i < this.cityPickers.length; i++) {
                    visits.push({
                        name: this.$refs.hops[i].name,
                        country: this.$refs.hops[i].country,
                        days: this.$refs.hops[i].days,
                    });
                }

                this.$router.push({
                    name: "results", params: {
                        startDate: this.startDate,
                        from: {
                            name: this.$refs.from.name,
                            country: this.$refs.from.country,
                        },
                        visits: visits,
                    }
                });
            },

            appendCityPicker() {
                this.cityPickers.push({
                    uuid: this.uuidv4gen(),
                    fuse: this.fuse,
                })
            },

            /**
             * Source: https://stackoverflow.com/a/2117523/4466589
             * @returns {string}
             */
            uuidv4gen() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            },
        },
    }
</script>

<style scoped>
    #buttons {
        display: flex;
        justify-content: space-between;
    }
</style>

