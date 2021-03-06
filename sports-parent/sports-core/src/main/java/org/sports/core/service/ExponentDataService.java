package org.sports.core.service;

import java.util.List;

import org.sports.core.common.GeneralMapper;
import org.sports.core.common.GeneralServiceImpl;
import org.sports.core.mapper.ExponentDataMapper;
import org.sports.core.model.ExponentData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExponentDataService extends GeneralServiceImpl<ExponentData> {

    @Autowired
    private ExponentDataMapper dataMapper;

    @Override
    public GeneralMapper<ExponentData> getGeneralMapper() {
        return dataMapper;
    }

    
    public List<ExponentData> findByIndexId(String indexId){
    	return dataMapper.selectByIndexId(indexId);
    }
    
    public List<Double> findDataByIndexId(String indexId){
    	return dataMapper.selectDataByIndexId(indexId);
    }

}
