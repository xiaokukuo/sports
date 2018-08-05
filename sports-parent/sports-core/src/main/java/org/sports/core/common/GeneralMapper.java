package org.sports.core.common;

import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface GeneralMapper<T>{
	 
	T selectById(@Param("id") int id);
	
	List<T> selectAll();
	
	int insert(@Param("entity") T entity);
	
	int insertByBatch(@Param("list") List<T> list);
	
	int truncateTable();

}
