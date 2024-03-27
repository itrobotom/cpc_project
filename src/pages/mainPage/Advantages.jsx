import React from 'react';
import { Box, Typography, Grid, Avatar, Stack } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import SettingsIcon from '@mui/icons-material/Settings';

const Advantages = ({bgColor}) => {
  const advantagesData = [
    {
      title: 'Методы обучения',
      description: 'Программа обучения включает в себя современные инструменты и материалы. Занятия проходят с применением геймификации и других современных технологий.',
      icon: <SportsEsportsIcon />,
    },
    {
      title: 'Молодой коллектив',
      description: 'Наши специалисты умеют зажечь интерес, на одной волне с детьми. Идут в ногу со временем!',
      icon: <GroupIcon />,
    },
    {
      title: 'Индивидуальный подход',
      description: 'Каждый ребенок уникален! Работаем как в группах, так и индивидуально.',
      icon: <SchoolIcon />,
    },
    {
      title: 'Участие в соревнованиях и конкурсах',
      description: 'Регулярные поездки по России и миру на соревнования, олимпиады и конкурсы!',
      icon: <GroupWorkIcon />,
    },
    {
      title: 'Высокие результаты учеников и педагогов',
      // description: 'Более **** победителей и призеров с **** по **** год по олимпиадам, соревнованиям и конкурсам городского, всероссийского и международного уровня. Регулярные профессиональные достижения педагогов.',
      description: "Более 200 победителей и призеров конкурсных высокорейтинговых мероприятий всероссийского и международного уровней за последние 3 года.",
      icon: <EmojiEventsIcon />,
    },
    {
      // title: 'Гибкая система обучения',
      // description: 'У вас всегда есть возможность сменить направление в любой момент. Используем дистанционную систему moodle в качестве дополнительного инструмента.',
      title: 'Контроль качества образовательных программ',
      description: 'Специалисты отдела мониторинга регулярно проводят тестирование на выявление одаренных детей. Каждая образовательная программа предполагает проверку эффективности методами тестирования и педагогического наблюдения',
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Box py={4} bgcolor="#fff" style={{ margin: '0 auto', paddingBottom: "70px", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: "50px" }}>
        Чем хороши наши занятия?
      </Typography>
      
      <Grid container spacing={3} xs={11} md={9} style={{ backgroundColor: '#fff', padding: '20px', minHeight: '40vh' }}>
        {advantagesData.map((advantage, index) => (
          <Grid key={index} item xs={12} md={6}>
            <Stack direction="row" alignItems="center" mb={2}>
              <Avatar sx={{ width: 60, height: 60, backgroundColor: bgColor, marginRight: 2 }}>
                {advantage.icon}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom style={{ fontSize: '1.4rem' }}>
                  {advantage.title}
                </Typography>
                <Typography variant="body1" style={{ fontSize: '1.1rem' }}>
                  {advantage.description}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default Advantages;