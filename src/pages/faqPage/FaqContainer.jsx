import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FaqContainer = () => {
  return (
    <>
        <Container style={{paddingTop: "100px", paddingBottom: "50px"}}>
            <Box style={{paddingBottom: "20px"}}>
                <Typography variant="h4" gutterBottom>
                    Ответы на часто задаваемые вопросы
                </Typography>
            </Box>
            
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography variant="h6">Как узнать, попали мы в группу или не хватило места?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Педагоги всех оповещают в первую неделю сентября. Если возник экстренный вопрос, можно написать ответственному за программу педагогу в Сферум.
                </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                <Typography variant="h6">Как узнать, куда был записан ребенок? Забыли.</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Рекомендуем повторно произвести запись. Если ваш ребенок был ранее уже записан на выбранную программу, то будет учтена первая дата на случай, если желающих будет больше, чем мест в группе. Учитывается очередность записи. Также указывайте почту при заполнении заявки. Вам на почту придет ваша заявка с данными записи. И вы всегда сможете посмотреть заполненный вариант ранее.
                </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                <Typography variant="h6">Куда записать ребенка? Не знаю, что ему больше подойдет.</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Рекомендуем обратиться к каталогу услуг, где можно выбрать по интересам и возрасту подходящую программу. Также доступны консультации у специалистов методического центра  
                    {' '}
                    <a href="https://cpc.tomsk.ru/nashi-sotrudniki/kustova-guzel-nailovna/" target="_blank" rel="noopener noreferrer">
                        Кустовой Гузель Наиловны
                    </a> 
                    , {' '}
                    <a href="https://cpc.tomsk.ru/nashi-sotrudniki/trofimova/" target="_blank" rel="noopener noreferrer">
                        Трофимовой Анны Александровны
                    </a> 
                    , {' '}
                    <a href="https://cpc.tomsk.ru/nashi-sotrudniki/dil-sofya-viktorovna/" target="_blank" rel="noopener noreferrer">
                            Шутовой Софьи Викторовны
                    </a> 
                    , {' '}
                    <a href="https://cpc.tomsk.ru/nashi-sotrudniki/basurmanova-olga-aleksandrovna-2/" target="_blank" rel="noopener noreferrer">
                            Драницы Ольги Александровны
                    </a> 
                    . {' '}
                    С 11 лет доступно тестирование для определения приоритетных интересов ребенка. Перейдите по ссылке “каталог услуг ЦПК” и откройте слева в панели фильтров “инструкция”.
                    Если ребенок уже посещал занятия в центре, рекомендуем обратиться к педагогу за консультацией в Сферум. Контактные данные педагогов, закрепленных за программами приведены ниже в таблице.
                    {' '}
                </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                >
                <Typography variant="h6">Когда начнутся занятия? Что нужно принести с собой?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Занятия начинаются с сентября. С собой сменная обувь. Документы на зачисление педагоги раздадут детям на занятии.
                </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5a-content"
                    id="panel5a-header"
                >
                <Typography variant="h6">Как нас будут оповещать о событиях и изменениях в расписании?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Каждому родителю будет отправлена ссылка на чат Сферума объединения, куда был записан ребенок. О всех актуальных новостях, изменениях в расписании педагоги будут оповещать в первую очередь в данном чате.
                </Typography>
                </AccordionDetails>
            </Accordion>
        </Container>
        
  </>
  );
}

export default FaqContainer;