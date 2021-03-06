class filtroBordeHorizontal extends Filtro {

    constructor( imgData, canvas) { 
        super( imgData, canvas );
        this.matrizSobel = [];
        this.matrizAux = []; // usada para testear el algoritmo multiplicadorMatriz
        this.cargarMatrizSobel();
        this.imgDataGris = new ImageData ( this.width, this.height );
        this.cargarMatriz ();
    }

    cargarMatrizSobel (  ) {
        for (let i = 0; i < 3; i++) {
            this.matrizSobel[i] = [];
        }
        this.matrizSobel[ 0 ] [ 0 ] = -1;
        this.matrizSobel[ 0 ] [ 1 ] = -2;
        this.matrizSobel[ 0 ] [ 2 ] = -1;
        this.matrizSobel[ 1 ] [ 0 ] = 0;
        this.matrizSobel[ 1 ] [ 1 ] = 0;
        this.matrizSobel[ 1 ] [ 2 ] = 0;
        this.matrizSobel[ 2 ] [ 0 ] = 1;
        this.matrizSobel[ 2 ] [ 1 ] = 2;
        this.matrizSobel[ 2 ] [ 2 ] = 1;
    }

    /*
        A cada pixel de la imagen se le setea el valor dado por el algoritmo multriplicadorMatriz. Este algoritmo
            multiplica cada adyacente al pixel actual por su correspondiente valor en la matriz sobel.
    */
    setFiltro ( ) { 
        let imgSobel = new ImageData( this.width, this.height );
        let filtroGris = new FiltroGrey( this.imageData, this.canvas );
        this.imgDataGris = filtroGris.getFiltro(); 
        let index = 0;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                index = this.calculateIndex(x, y, this.width);
                this.setData( imgSobel, this.multiplicadorMatriz ( x , y ), index );
            } 
        }
        this.context.putImageData( imgSobel, 0, 0 );
        // this.runTest();
    }
    
    // Multiplica la matriz sobel por una subMatriz de la imagen
    multiplicadorMatriz ( x, y ) {
        let index;
        let sum = 0;
        let auxY = y;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                index = this.calculateIndex(x, y, this.width);
                sum += this.imgDataGris.data[ index ] * this.matrizSobel[ x%3 ] [ y%3 ];
                y += 1;
            }
            x += 1;
            y = auxY;
        }
        return sum;
    }

    imprimirMatriz ( ) { 
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                console.log( this.matrizAux [ i ] [ j ]);
            }
            console.log( "x = " + i );
        }
    }

    //-----------------Testing-----------------

    // carga matriz aux, usada para testear
    cargarMatriz () {
        for (let i = 0; i < 6; i++) {
            this.matrizAux[i] = [];
        }
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                this.matrizAux[i][j] = i*j + 1;
            }
        }
    }

    // Usado para probar el algoritmo multiplicadorMatrizz
    test ( x, y ) {
        let sum = 0;
        let auxY = y;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                //index = ( x + y * this.width ) * 4;
                if (! ( i === 1 && j === 1) )
                   sum += this.matrizAux[ x ] [ y ] * this.matrizSobel[ x%3 ] [ y%3 ];  
                y += 1;
            }
            x += 1;
            y = auxY;
        }
        return sum;
    }

    // Usado para correr el test del algoritmo multiplicadorMatrizz
    runTest () { 
        console.log ( "matriz aux" );
        this.imprimirMatriz();

        for (let x = 0; x < 6; x+=3) {
            for (let y = 0; y < 6; y+=3) {
                this.matrizAux[ x+1][ y+1 ] = this.test( x, y);         
            }
        }
       
        console.log ( "matriz sobel" );
        this.imprimirMatriz();
    }
}
