package org.sports.core.service;

import org.sports.core.common.GeneralMapper;
import org.sports.core.common.GeneralServiceImpl;
import org.sports.core.mapper.FootballIndexMapper;
import org.sports.core.model.FootballIndex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FootballIndexService  extends GeneralServiceImpl<FootballIndex> {

    @Autowired
    private FootballIndexMapper footballIndexMapper;

    @Override
    public GeneralMapper<FootballIndex> getGeneralMapper() {
        return footballIndexMapper;
    }
}
