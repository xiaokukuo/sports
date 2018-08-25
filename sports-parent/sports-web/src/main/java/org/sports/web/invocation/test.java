package org.sports.web.invocation;

public class test {
	public static void main(String[] args) {
		 int j = test();

	        System.err.println(j);
	        

	}
	

    public static int test(){
        int i = 0;

        try{
        	i++;
           return  i;
        }finally {
        	i++;
            System.err.println(i);
        }
    }


}
