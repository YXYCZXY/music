<template>
    <footer class="main-footer">
        <a href="https://github.com/YXYCZXY">
        <img style="position: absolute; top: 0; right: 0; border: 0;"
        src="//bbsmax.ikafan.com/static/L3Byb3h5L2h0dHAvaW1hZ2VzMjAxNS5jbmJsb2dzLmNvbS9ibG9nLzY4MjY2MS8yMDE2MTIvNjgyNjYxLTIwMTYxMjEwMjIzNjUzMTc5LTE4NzA3Mjk0MDEucG5n.jpg"
        alt="Fork me on GitHub" >
        </a>
          <a>{{msg}}</a>
    </footer>
</template>
<script>
export default {
    data () {
        return {
            msg:'出品'
        }
    }

}
</script>
<style lang="stylus" scoped>
.main-footer
    margin-top 40px
    text-align center
    a 
        color red
        font-size 20px
</style>
