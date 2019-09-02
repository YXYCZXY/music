<template>
    <footer class="main-footer">
          <a style="font-size:32px">{{msg}}</a>
    </footer>
</template>
<script>
export default {
    data () {
        return {
            msg:'或许是不知梦的原因   琉璃之人追逐幻影'
        }
    }

}
</script>
<style lang="stylus" scoped>
.main-footer
    margin-top 40px
    position absolute
    top 384px
    left 28.8%
    a 
    font-size 82px
    background  linear-gradient(to bottom right, #FDD700, #70d12f)
    zoom 1
    margin 0 0 42px
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index 99
</style>
