import java.util.ArrayList;

public class App {
    public static void main(String[] args) {
		ResolverProblemaImplementacion problema = new ResolverProblemaImplementacion();		
		
		ArrayList<LetraResultado> arrayResultado = problema.obtenerResultado("sal", "mas", "alla");		
		if (arrayResultado != null) {			
			for (int i = 0; i < arrayResultado.size(); i++) {				
				System.out.format("%s : %s \n", arrayResultado.get(i).letra, arrayResultado.get(i).valor );				
			}			
		} else {			
			System.out.println("No se ha encontrado una solucionn valida para los parametros ingresados.");			
		}			
	}
}
