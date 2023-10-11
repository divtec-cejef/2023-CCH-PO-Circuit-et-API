#include "12f510.h"
#fuses INTRC
#use delay(clock=8000000)

#define SERIAL PIN_B4
#define PARALLEL PIN_B5
#define FIRE PIN_B1

#define TRIGGER PIN_B2
#define BONUS_EN PIN_B0

void main()
{
    setup_adc_ports(NO_ANALOGS);
    setup_comparator(NC_NC_NC_NC);
    SETUP_TIMER_0(T0_INTERNAL);
    
    output_low(PARALLEL);   // S�quence de d�marrage de s�curit�
    output_low(SERIAL);     //
    output_high(FIRE);      //
    delay_ms(1000);         //
    output_high(SERIAL);    //
    delay_ms(200);          //
    
    output_low(FIRE);       // D�charge des condensateurs avant la mise en route
    delay_ms(100);          // afin d'�viter un court-circuit dans les relais
    output_high(FIRE);      //
    
    while(1)
    {
        output_low(PARALLEL);
        delay_ms(50);
        output_high(SERIAL);
        delay_ms(200);
        while(!input_state(TRIGGER))
        {}
        
        if(input_state(BONUS_EN))
        {
            delay_ms(30);           //meilleur d�lai pour : 
            output_low(FIRE);       //Acc�l�rateur 1 : 30ms
            delay_ms(100);          //Acc�l�rateur 2 : 10ms
            output_high(FIRE);
            output_low(SERIAL);
            delay_ms(1000);
            output_high(PARALLEL);
            delay_ms(15000);
            output_low(PARALLEL);
            delay_ms(1000);
        }                       
    }
}