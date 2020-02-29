<template>
    <div>
        <nav class="navbar navbar-dark bg-dark">
            <span class="navbar-brand mb-0 h1">Tripscanner</span>
        </nav>
        <br/>

        <main>
            <div class="container-fluid">
                <h2>From</h2>
                <CityPicker
                        :search="this.search"
                        :hideDays="true"
                ></CityPicker>

                <h2>Cities</h2>
                <div id="cityPickers">
                    <CityPicker
                            v-for="cityPicker in this.cityPickers"
                            :key="cityPicker.uuid"
                            :search="search"
                            :hideDays="false"
                    />
                </div>
            </div>

            <br />
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
                "cityPickers": [],
            }
        },
        methods: {
            search(query) {
                return this.fuse.search(query);
            },

            next() {
                this.$router.push({path: "/results"})
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

