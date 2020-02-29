<template>
    <div>
        wowwwww!!
    </div>
</template>

<script>
    export default {
        props: [
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

