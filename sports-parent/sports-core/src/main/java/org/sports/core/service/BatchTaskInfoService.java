package org.sports.core.service;

import org.sports.core.common.GeneralMapper;
import org.sports.core.common.GeneralServiceImpl;
import org.sports.core.mapper.BatchTaskInfoMapper;
import org.sports.core.model.BatchTaskInfo;
import org.springframework.beans.factory.annotation.Autowired;

public class BatchTaskInfoService extends GeneralServiceImpl<BatchTaskInfo> {

	@Autowired
	private BatchTaskInfoMapper batchTaskInfoMapper;

	@Override
	public GeneralMapper<BatchTaskInfo> getGeneralMapper() {
		return batchTaskInfoMapper;
	}

}
