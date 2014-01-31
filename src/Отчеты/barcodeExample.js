/**
 * 
 * @author Alexey
 */
function barcode() {
    var self = this;

    function getBarcode(rawData) {
        var offset = 32;
        var highAscii = 18;
        var newCodeString = new Array(rawData.length + 3);
        newCodeString[0] = offset + highAscii + 104;
        var total = 104;
        for (var stringCounter = 0;
                stringCounter < rawData.length; stringCounter++) {
            var
                    character =
                    rawData.substr(stringCounter, 1);
            var ASCIIValue =
                    character.charCodeAt(0);
            var checkDigit = ((ASCIIValue - offset) *
                    (stringCounter + 1));
            total += checkDigit;
            newCodeString[stringCounter
                    + 1] = ASCIIValue;
        }
        var check = total % 103;
        var holder = 0;
        if (check
                + offset >= 127) {
            holder = check + offset + highAscii;
        } else {
            holder = check + offset;
        }
        newCodeString[newCodeString.length - 2] =
                holder;
        holder = 106 + offset + highAscii;
        newCodeString[newCodeString.length - 1] = holder;
        for (var rCounter = 0
                ; rCounter < newCodeString.length; rCounter++) {
            if (newCodeString[rCounter] == 32) {
                newCodeString[rCounter] = 128;
            }
        }
        return newCodeString;
    }

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        self.label.text = getBarcode(self.textField.text);
    }//GEN-LAST:event_buttonActionPerformed

    function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
        var d = new Date();
        alert(d.toLocaleDateString());
        var monthNames = [ "Январь", "Февраль", "March", "April", "May", "June",
                           "July", "August", "September", "October", "November", "December" ];
        alert(monthNames[d.getMonth()]+" "+d.getFullYear());
    }//GEN-LAST:event_button1ActionPerformed
}
