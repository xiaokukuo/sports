package org.sports.core.common;

import java.util.List;

public interface IGeneralService<T> {
	
	T findById(int id);
	
	List<T> findAll();

	List<T> save(List<T> list);
	
	T save(T entity);
	
	int truncateTable();
}
