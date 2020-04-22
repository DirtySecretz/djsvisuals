var kick = $('#Square-Kick'),
    clap = $('#Cross-Clap'),
    hh = $('#Circles-HH'),
    keys = $('#Keys'),
    bass = $('#Bass'),
    vocals = $('#Vocals'),
    logo = $('#Logo');

var hhCount = 0;

navigator.requestMIDIAccess().then((access) => {

    const inputs = access.inputs;
    const outputs = access.outputs;

    const inputText = [];
    const outputText = [];

    inputs.forEach((midiInput) => {

        console.log( midiInput.name );

        midiInput.onmidimessage = function(message){

            const command = message.data[0] >> 4;
            const channel = message.data[0] & 0xf;
            const note = message.data[1];
            const velocity = message.data[2];

            if(command == 9 && velocity > 0){

                //console.log('Command: ' + (message.data[0] >> 4));
                console.log('Channel: ' + (message.data[0] & 0xf));
                console.log('Note: ' + message.data[1]);
                //console.log('Velocity: ' + (message.data[2] / 127));

                // Kick
                if(channel == 0 && note == 48){
                    kick.stop().css('opacity',1).animate({
                        opacity: 0
                    }, 800);

                // Clap
                } else if(channel == 1 && note == 60){
                    clap.stop().css('opacity',1).animate({
                        opacity: 0
                    }, 800);

                // HH
                } else if((channel == 2 || channel == 3) && note == 60){
                    hh.find('g:eq(' + hhCount + ')').stop().css('opacity',1).animate({
                        opacity: 0
                    }, 500);
                    if(hhCount == 3){
                        hhCount = 0;
                    } else {
                        hhCount++;
                    }

                // Keys
                } else if(channel == 4){
                    var key = note - 60;
                    keys.find('rect:eq(' + key + ')').stop().css('opacity',1).animate({
                        opacity: 0
                    }, 800);

                // Bass
                } else if(channel == 5){
                    var key = note - 60;
                    bass.find('rect:eq(' + key + ')').stop().css('opacity',1).animate({
                        opacity: 0
                    }, 800);

                // Vocal 1
                } else if(channel == 8 && note == 60){
                    vocals.find('path:eq(0)').stop().css('opacity',1).animate({
                        opacity: 0
                    }, 600);

                // Vocal 2
                } else if(channel == 9 && note == 60){
                    vocals.find('path:eq(1)').stop().css('opacity',1).animate({
                        opacity: 0
                    }, 600);

                // Vocal 3
                } else if(channel == 10 && note == 60){
                    vocals.find('path:eq(2)').stop().css('opacity',1).animate({
                        opacity: 0
                    }, 600);

                // Vocal 4
                } else if(channel == 11 && note == 60){
                    vocals.find('path:eq(3)').stop().css('opacity',1).animate({
                        opacity: 0
                    }, 600);

                // Logo
                } else if(channel == 12 && note == 60){
                    logo.stop().css('opacity',1).animate({
                        opacity: 0
                    }, 200);

                } else if(channel == 13 && note == 60){
                    logo.stop().css('opacity',1).animate({
                        opacity: 0
                    }, 1200);


                }

            }

        }
    });

    outputs.forEach((midiOutput) => {
        console.log( midiOutput.name );
    });

  });
