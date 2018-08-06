package org.sports.core.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.sports.core.common.GeneralMapper;
import org.sports.core.model.ExponentData;

@Mapper
public interface ExponentDataMapper  extends GeneralMapper<ExponentData> {

	List<ExponentData> selectByIndexId(@Param("indexId")String indexId);
	
}
