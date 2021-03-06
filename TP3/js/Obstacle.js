class Obstacle  {
    static frameRate = 1500;

    constructor(name, positionX, positionY, width, height, value, isKiller) {
        this.name = document.createElement("div");
        this.name =  name;
        this.originalPosX = positionX;
        this.positionX = positionX;
        this.positionY = positionY;
        this.height = height;
        this.width = width;
        this.value = value;
        this.isKiller = isKiller;
        this.restoredPosX = false;
        this.setCss(name, positionX, positionY, width, height);
    }

    /**
     * @param name is the HTML element
     * @param positionX => To Define
     * @param positionY => To Define
     * @param height of the box
     * @param width of the box
     */
    setCss(name, positionX, positionY, width, height) {
        name.style.width = width;
        name.style.height = height;
        name.style.top = positionY;
        name.style.left = positionX;
    }

    // Getters and setters
    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getPositionX() {
        return this.positionX;
    }

    setPositionX(positionX) {
        this.name.style.left = positionX;
        this.positionX = positionX;
    }

    getPositionY() {
        return this.positionY;
    }

    setPositionY(positionY) {
        this.positionY = positionY;
    }

    getHeight() {
        return this.height;
    }

    setHeight(height) {
        this.height = height;
    }

    getWidth() {
        return this.width;
    }

    setWidth(width) {
        this.width = width;
    }

    /**
     * @return value indicating if the object
     * is a character killer
     */
    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
    }

    getIsKiller() {
        return this.isKiller;
    }

    /**
     * @param isKiller set boolean indicating if the object
     * is a character killer
     */
    setIsKiller(isKiller) {
        this.isKiller = isKiller;
    }

    static setFrameRate ( newValue ) { 
        Obstacle.frameRate = newValue;
    }

    restartPosX() { 
        const frameRate = Obstacle.frameRate;
        if ( ! this.isKiller && this.positionX != this.originalPosX ) {
            setTimeout(() => {
                this.setPositionX( this.originalPosX );
            }, frameRate);
        }
    }

}

