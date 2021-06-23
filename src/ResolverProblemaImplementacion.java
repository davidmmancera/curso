import java.util.ArrayList;
import java.lang.Math;

public class ResolverProblemaImplementacion implements ResolverProblemaInterface {
    @Override
    public ArrayList<LetraResultado> obtenerResultado(String palabraUno, String palabraDos, String palabraResultado) {

        palabraUno = palabraUno.toLowerCase();
        palabraDos = palabraDos.toLowerCase();
        palabraResultado = palabraResultado.toLowerCase();

        ArrayList<LetraResultado> listaResultado = new ArrayList<LetraResultado>(); // valores de la solucion acumulados
                                                                                    // y sobre esta lista se dara el
                                                                                    // proceso de backtracking. Mutara
                                                                                    // los objetos continuamente

        ArrayList<String> listaPalabras = new ArrayList<String>(); // parametros de string para iterar mas facil y
                                                                   // obtener letras

        ArrayList<Character> listaLetrasDistintas = new ArrayList<Character>(); // lista que contiene a las letras
                                                                                // distintas

        int cantValoresPreasignados = 0; // = etapa, por que valor iniciar en el backtracking - //es la cantidad de
                                         // valores que ya sabemos que tienen un valor especifico
        int cantColumnasIguales = 0; // cuando es a a / a hacia abajo
        Character ultimaLetraIgual = null; // cuando se verifican columnas
        int diferenciaIndice = Math.abs(palabraUno.length() - palabraDos.length());

        // guarda que tan larga es la mayor palabra mas larga
        int mayorLargo = Math.max(Math.max(palabraUno.length(), palabraDos.length()), palabraResultado.length());

        listaPalabras.add(palabraUno);
        listaPalabras.add(palabraDos);
        listaPalabras.add(palabraResultado);

        // ------------------Verificación de longitud de palabras---------------//

        // el tercer palabra o resultado, debe ser mayor o igual a las demas, no puede
        // ser menor
        // si la tercer palabra es mayor, no puede ser mayor en mas de un digito
        if (palabraResultado.length() >= palabraUno.length() && palabraResultado.length() >= palabraDos.length()) {

            if (palabraUno.length() > palabraDos.length()) {
                if (palabraResultado.length() - palabraUno.length() > 1) {
                    return null;
                }
            } else if (palabraDos.length() > palabraUno.length()) {
                if (palabraResultado.length() - palabraDos.length() > 1) {
                    return null;
                }
            } else {
                if (palabraResultado.length() - palabraDos.length() > 1) {
                    return null;
                }
            }
        } else {
            return null;
        }

        // -------------------Verificacion de columnas con letras iguales----------------------//

        for (int i = 0; i < mayorLargo; i++) {
            // validacion de indices en cada uno de los cuatro casos (todas iguales, dos
            // iguales y una menor etc...)

            // Si se asigna un valor a una letra, ya se la agrega su respectivo objeto a la
            // listaResultado.

            if (palabraResultado.length() > palabraUno.length() && palabraUno.length() == palabraDos.length()) {
                if (i != 0) {
                    // que existan tres letras iguales
                    if (palabraResultado.charAt(i) == palabraUno.charAt(i - 1)
                            && palabraResultado.charAt(i) == palabraDos.charAt(i - 1)) {

                        if (i != 0 && i - 1 != 0) { // y que si son iguales no sen las primeras de cada palabra(0)

                            if (cantColumnasIguales < 1) {
                                // sise encuentras letras iguales en las tres palabras indice coorrespomdiente,
                                // ese valor es 0 y se agrega al array de listaresultado
                                LetraResultado nuevaLetra = new LetraResultado();
                                nuevaLetra.letra = palabraResultado.charAt(i);
                                nuevaLetra.valor = 0;
                                listaResultado.add(nuevaLetra);
                                listaLetrasDistintas.add(palabraResultado.charAt(i));
                                ultimaLetraIgual = palabraResultado.charAt(i);
                                cantColumnasIguales += 1;
                            } else {
                                if (ultimaLetraIgual.equals(palabraResultado.charAt(i))) {
                                    cantColumnasIguales += 1;
                                } else {
                                    return null;
                                }
                            }
                        } else {
                            return null;
                        }
                    }
                }
            } else if (palabraUno.length() > palabraDos.length()) {
                if (i >= diferenciaIndice) {
                    if (palabraResultado.charAt(i) == palabraDos.charAt(i - diferenciaIndice)
                            && palabraResultado.charAt(i) == palabraUno.charAt(i)) {

                        if (i != 0 && i - diferenciaIndice != 0) {
                            if (cantColumnasIguales < 1) {
                                LetraResultado nuevaLetra = new LetraResultado();
                                nuevaLetra.letra = palabraResultado.charAt(i);
                                nuevaLetra.valor = 0;
                                listaResultado.add(nuevaLetra);
                                listaLetrasDistintas.add(palabraResultado.charAt(i));
                                ultimaLetraIgual = palabraResultado.charAt(i);
                            } else {
                                if (ultimaLetraIgual.equals(palabraResultado.charAt(i))) {
                                    cantColumnasIguales += 1;
                                } else {
                                    return null;
                                }
                            }
                        } else {
                            return null;
                        }
                    }
                }
            } else if (palabraDos.length() > palabraUno.length()) {
                if (i >= diferenciaIndice) {
                    if (palabraResultado.charAt(i) == palabraDos.charAt(i)
                            && palabraResultado.charAt(i) == palabraUno.charAt(i - diferenciaIndice)) {
                        if (i != 0 && i - diferenciaIndice != 0) {
                            if (cantColumnasIguales < 1) {
                                LetraResultado nuevaLetra = new LetraResultado();
                                nuevaLetra.letra = palabraResultado.charAt(i);
                                nuevaLetra.valor = 0;
                                listaResultado.add(nuevaLetra);
                                listaLetrasDistintas.add(palabraResultado.charAt(i));
                                ultimaLetraIgual = palabraResultado.charAt(i);
                            } else {
                                if (ultimaLetraIgual.equals(palabraResultado.charAt(i))) {
                                    cantColumnasIguales += 1;
                                } else {
                                    return null;
                                }
                            }
                        } else {
                            return null;
                        }
                    }
                }
            } else {
                if (palabraResultado.charAt(i) == palabraDos.charAt(i)
                        && palabraResultado.charAt(i) == palabraUno.charAt(i)) {
                    if (i == 0) {
                        if (cantColumnasIguales < 1) {
                            LetraResultado nuevaLetra = new LetraResultado();
                            nuevaLetra.letra = palabraResultado.charAt(i);
                            nuevaLetra.valor = 0;
                            listaResultado.add(nuevaLetra);
                            listaLetrasDistintas.add(palabraResultado.charAt(i));
                            ultimaLetraIgual = palabraResultado.charAt(i);
                        } else {
                            if (ultimaLetraIgual.equals(palabraResultado.charAt(i))) {
                                cantColumnasIguales += 1;
                            } else {
                                return null;
                            }
                        }
                    } else {
                        return null;
                    }
                }
            }
        }
        if (cantColumnasIguales > 0) // si se encontro una columna con iguales, se agrega +1 a la valriable de
                                    // cantvalores preasignados
            cantValoresPreasignados += 1;
        // -------------------------- //
        // si la tercer palabra es mayor a las otras dos en 1 digito, el primer digito
        // de esa tercer palabra es 1 si o si
        if (palabraResultado.length() > Math.max(palabraUno.length(), palabraDos.length())) {
            // Posible asignación previa de valor a una letra en base a la longitud del
            // string resultado.
            // Si se asigna un valor a la letra, ya se agrega su respectivo objeto a la
            // listaResultado.
            LetraResultado nuevaLetra = new LetraResultado();
            nuevaLetra.letra = palabraResultado.charAt(0);
            nuevaLetra.valor = 1;
            listaResultado.add(nuevaLetra);
            listaLetrasDistintas.add(palabraResultado.charAt(0));
            cantValoresPreasignados += 1;
        }

        for (int i = 0; i < listaPalabras.size(); i++) {
            // Se buscan todas las letras distintas que hayan en las tres palabras y se las
            // agregan a la listaResultado. / sin repetir letra
            String palabraRevisada = listaPalabras.get(i);

            for (int k = 0; k < palabraRevisada.length(); k++) {
                if (!listaLetrasDistintas.contains(palabraRevisada.charAt(k))) {
                    if (listaLetrasDistintas.size() + 1 <= 10) {
                        LetraResultado nuevaLetra = new LetraResultado();
                        nuevaLetra.letra = palabraRevisada.charAt(k);
                        listaResultado.add(nuevaLetra);
                        listaLetrasDistintas.add(palabraRevisada.charAt(k));
                    } else {
                        return null;
                    }
                }
            }
        }

        // La listaResultado ya posee todos los objetos de LetraResultado agregados. El
        // algoritmo de backTracking mutará dicha lista y el valor booleano que devuelva
        // determinará si hubo una solución válida.
        // Los valores de dicha solución estarán en la listaResultado ya mutada. La
        // cantidad de valores preasignados determinará la etapa por el cual comienza el
        // algoritmo, y también determina qué porción de la lista
        // no hace falta mutar, ya que sus valores están determinados de antemano.

        // cantValoresPreasignados: indica el indice del listaResultado en donde se debe
        // iniciar la busqueda o recorrido de backtraking
        boolean resultado = backTrackingValores(listaResultado, cantValoresPreasignados, palabraUno, palabraDos, palabraResultado);

        if (resultado) {
            return listaResultado;
        } else {
            return null;
        }
    }

    private boolean backTrackingValores(ArrayList<LetraResultado> listaResultado, int etapa, String input1,
            String input2, String input3) {

        boolean solucion = false;

        // de 0 - 9 hay 10 recorridos, 9 es el maximo valor que puede tener una letra
        for (int i = 0; i < 10 && solucion != true; i++) {
            if (this.valorFactible(listaResultado, etapa, i, input1, input2, input3)) { 
                listaResultado.get(etapa).valor = i;
                if (etapa != listaResultado.size() - 1) {
                    // si todavia nose ha asignado valor a todas las letras
                    solucion = backTrackingValores(listaResultado, etapa + 1, input1, input2, input3);
                } else {
                    // cuando ya asignaste valor a todas las letras se valida si es solucion
                    solucion = this.esSolucion(listaResultado, input1, input2, input3);
                }
            }
        }
        return solucion;
    }

    private boolean valorFactible(ArrayList<LetraResultado> arrayResultado, int etapa, int valor, String input1,
            String input2, String input3) {
        // verifica qeu para las etapas anteriores no halla un valor que estas asignado
        for (int i = etapa - 1; i >= 0; i--) {
            if (arrayResultado.get(i).valor == valor
                    || (input1.charAt(0) == arrayResultado.get(etapa).letra && valor == 0)
                    || (input2.charAt(0) == arrayResultado.get(etapa).letra && valor == 0)
                    || (input3.charAt(0) == arrayResultado.get(etapa).letra && valor == 0)) {
                return false;
            }
        }
        return true;
    }

    private boolean esSolucion(ArrayList<LetraResultado> arrayResultado, String input1, String input2, String input3) {

        int valorInput1 = 0;
        int valorInput2 = 0;
        int valorInput3 = 0;

        int largoInput1 = input1.length();
        int largoInput2 = input2.length();
        int largoInput3 = input3.length();

        for (int i = 0; i < arrayResultado.size(); i++) {
            for (int k = 0; k < largoInput1; k++) {
                if (input1.charAt(k) == arrayResultado.get(i).letra) {
                    valorInput1 += arrayResultado.get(i).valor * Math.pow(10, largoInput1 - k);
                }
            }

            for (int k = 0; k < largoInput2; k++) {
                if (input2.charAt(k) == arrayResultado.get(i).letra) {
                    valorInput2 += arrayResultado.get(i).valor * Math.pow(10, largoInput2 - k);
                }
            }

            for (int k = 0; k < largoInput3; k++) {
                if (input3.charAt(k) == arrayResultado.get(i).letra) {
                    valorInput3 += arrayResultado.get(i).valor * Math.pow(10, largoInput3 - k);
                }
            }
        }

        return valorInput1 + valorInput2 == valorInput3;
    }
}
