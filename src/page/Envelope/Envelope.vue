<template>
    <div class="envelope">
        <img class="envelope-img" src="../../assets/img/Sharearedenvelope.png">
        <p class="text">{{envelope1}}元</p>
    </div>
</template>

<script>
export default {
    data(){
        return{
            envelope1: "5",
            envelope1: "10",
            envelope1: "20",
        }
    }
}
</script>

<style scoped>
.envelope{
     position: relative;
     left: 0px;
     top:0px;
    width: 100%;
    height: 100vh;
}
.envelope-img{
    position: absolute;
    left:10%;
    top:20%;
    width: 80%;
    height: 50%;
    margin:  0 auto;
}
.text{
    position: absolute;
    left:40%;
    top:27%;
    font-family: FZZDHJW-GB1-0;
	font-size: 80px;
    color: #dd4233;
}
</style>

