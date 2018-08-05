package org.sports.core.common;

import java.util.List;

public abstract class GeneralServiceImpl<T> implements IGeneralService<T>{

	public abstract GeneralMapper<T> getGeneralMapper();

	@Override
	public T findById(int id) {
		return getGeneralMapper().selectById(id);
	}
	
	@Override
	public List<T> findAll() {
		return getGeneralMapper().selectAll();
	}
	
	@Override
	public List<T> save(List<T> list) {
		getGeneralMapper().insertByBatch(list);
		return list;
	}

	@Override
	public T save(T entity) {
		getGeneralMapper().insert(entity);
		return entity;
	}
	
	@Override
	public int truncateTable() {
		return getGeneralMapper().truncateTable();
	}

}
