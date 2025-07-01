import { Dialog, DialogTitle,  Button, Box } from "@mui/material";
import { useState, useEffect } from 'react';

function PopupConsultation({isOpenPopupClick, onClose}) {
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        setOpenPopup(true);
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
                Запись: 
                <Button
                    onClick={handleClosePopup}
                    style={{ position: 'absolute', right: 8, top: 8 }}
                >
                X
                </Button>
            </DialogTitle>
            <Box sx={{ p: 2, pt: 0, pr: 4, textAlign: "left", fontSize: '20px', fontFamily: 'Roboto, sans-serif' }}>
                {' '}Записаться на проф консультацию к специалистам нашего центра:{' '}
                <a href="https://cpc.tomsk.ru/nashi-sotrudniki/kustova-guzel-nailovna/" target="_blank" rel="noopener noreferrer">
                    Кустовой Гузель Наиловне
                </a> 
                ,{' '}
                <a href="https://cpc.tomsk.ru/nashi-sotrudniki/trofimova/" target="_blank" rel="noopener noreferrer">
                    Трофимовой Анне Александровне
                </a> 
                ,{' '}
                <a href="https://cpc.tomsk.ru/nashi-sotrudniki/dil-sofya-viktorovna/" target="_blank" rel="noopener noreferrer">
                    Шутовой Софье Викторовне
                </a> 
                ,{' '}
                <a href="https://cpc.tomsk.ru/nashi-sotrudniki/basurmanova-olga-aleksandrovna-2/" target="_blank" rel="noopener noreferrer">
                    Дранице Ольге Александровне
                </a> 
                {' '} (контактные данные на личных страницах специалистов). 
            </Box>
        </Dialog>
    );
}

export { PopupConsultation }