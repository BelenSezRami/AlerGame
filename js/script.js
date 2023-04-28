window.onload = () => {
    console.log(document.getElementById('start'))
    document.getElementById('start').onclick = () => {
        console.log("click")
        document.getElementById('start').classList.add("displayNone")
        document.getElementById('imagen').classList.add("displayNone")

        Game.init()
    }

}
