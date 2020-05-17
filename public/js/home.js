$(document).ready(function () {

    /*
    TODO:   The code below attaches a `keyup` event to `#number` text field.
            The code checks if the current number entered by the user in the
            text field does not exist in the database.

            If the current number exists in the database:
            - `#number` text field background color turns to red
            - `#error` displays an error message `Number already registered`
            - `#submit` is disabled

            else if the current number does not exist in the database:
            - `#number` text field background color turns back to `#E3E3E3`
            - `#error` displays no error message
            - `#submit` is enabled
    */
    $('#number').keyup(function () {
        // your code here 
        var number = $('#number').val();

        if (!number) {
            console.log('yuck')
        }

        else {

            $.get('/getCheckNumber', {number: number}, function (result) {

                /*
                    if the current value of `number` exists in the database
                    change the background-color of the `<input>` element to red
                    display an error message
                    and disable the submit button
                */
               
                if(parseInt(result.number) == number) {
                    console.log('EQUAL QAQO')
                    $('#number').css('background-color', 'red');
                    $('#error').text('Number already registered');
                    $('#submit').prop('disabled', true);
                }
    
                /*
                    else
                    change the background-color of the `<input>` element back
                    remove the error message
                    and enable the submit button
                */
                else {
                    console.log('BAKET AYAW PADIN')
                    $('#number').css('background-color', '#E3E3E3');
                    $('#error').text('');
                    $('#submit').prop('disabled', false);
                }
            });
        }
        
    })

    /*
    TODO:   The code below attaches a `click` event to `#submit` button.
            The code checks if both text fields are not empty. The code
            should communicate asynchronously with the server to save
            the information in the database.

            The new contact should be displayed immediately, and without
            refreshing the page, after the values are saved in the database.

            The name and the number fields are reset to empty values.
    */
    $('#submit').click(function () {
        // your code here
        const name = $('#name').val();
        const number = $('#number').val();

        if (name === '' || number === '') {

        } else {
            console.log('before adding')
            $.get('/add', {name: name, number: number}, result => {
                // TODO
                
                let outerDiv = document.createElement('div');
                let img = document.createElement('img')
                let infoDiv = document.createElement('div')
                let button = document.createElement('button')

                let p1 = document.createElement('p')
                let p2 = document.createElement('p')

                $(outerDiv).addClass('contact')
                $(img).addClass('icon')
                $(infoDiv).addClass('info')
                $(button).addClass('remove')

                $(p1).addClass('text')
                $(p2).addClass('text')

                $(img).attr('src', "/images/icon.webp")
                $(p1).text(name)
                $(p2).text(number)
                $(button).text(' X ')

                outerDiv.append(img)
                outerDiv.append(infoDiv)
                outerDiv.append(button)

                infoDiv.append(p1)
                infoDiv.append(p2)

                $('#contacts').append(outerDiv)
            })
        }
        
    });

    /*
    TODO:   The code below attaches a `click` event to `.remove` buttons
            inside the `<div>` `#contacts`.
            The code deletes the specific contact associated to the
            specific `.remove` button, then removes the its parent `<div>` of
            class `.contact`.
    */
    $('#contacts').on('click', '.remove', function () {
        // your code here
        
        let number = $(this).parent().find('p')[1];
        
        number = $(number).text()
        number = parseInt(number)
        
        $.get('/delete', {number: number}, result => {
            console.log(result)
            $(this).parent().remove();
        })
    });

})
