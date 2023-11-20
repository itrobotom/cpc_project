import { Dialog, DialogTitle,  Button, Typography, Box, IconButton } from "@mui/material";
import { useState, useEffect } from 'react';

function PopupInstruction({isOpenPopupClick, onClose}) {
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        // Проверяем, был ли попап уже показан на данном устройстве 
        const isPopupShown = localStorage.getItem('popupShown');

        if (!isPopupShown || isOpenPopupClick !== undefined) {
            // Если не был показан, показываем попап и сохраняем в localStorage
            setOpenPopup(true);
            localStorage.setItem('popupShown', 'true');
        }
    }, [isOpenPopupClick]);

    const handleClosePopup = () => {
        setOpenPopup(false);
        if(onClose !== undefined){
            onClose(); // Вызываем функцию onClose после закрытия попапа, если она была передана через пропсы (не передается, когда вызывается впервые при открытии каталога)
        }    
    };

    return(
        <Dialog open={openPopup} onClose={handleClosePopup} sx={{ textAlign: 'center', mt: 4 }}>
            <DialogTitle>
                Инструкция по работе с каталогом
                <Button
                    onClick={handleClosePopup}
                    style={{ position: 'absolute', right: 8, top: 8 }}
                >
                X
                </Button>
            </DialogTitle>
            <Box sx={{ p: 2, pt: 0, pr: 4, textAlign: "left", fontSize: '20px', fontFamily: 'Roboto, sans-serif' }}>
                {/* <p>Инструкция:</p> */}
                <ol>
                <li>Если вы уже знаете куда записать ребенка кликаем на кнопку в панели фильтров снизу слева "Записаться", которая переводит на форму.</li>
                <li>
                    Если вы записываете ребенка впервые, рекоммендуется пройти {' '}
                    <a href="https://testometrika.com/business/test-to-determine-career/" target="_blank" rel="noopener noreferrer">
                    профориентационное тестирование
                    </a>
                    {' '}(с 11 лет) или {' '}
                    <a href="#" target="_blank" rel="noopener noreferrer">
                    записаться
                    </a>
                    {' '}на проф консультацию к специалистам нашего центра.
                </li>
                </ol>
            </Box>
        </Dialog>
    );
}

export { PopupInstruction }