const general = {
    oldMouseX: null,
    oldMouseY: null,
    priority: 0,
    
    changeOldMousePosition(x, y) {
        this.oldMouseX = x;
        this.oldMouseY = y;
    }
}

export default general;