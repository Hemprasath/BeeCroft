exports.sendWhatsAppMessage = async (phoneNumber) => {
    const phone = phoneNumber.replace(/\D/g, "");

    const payload = {
        countryCode: "+91",
        phoneNumber: phone,
        callbackData: "Form submission success",
        type: "Template",
        template: {
            name: "thank_you_message",
            languageCode: "en"
        }
    };

    //   try {
    //     const res = await fetch("https://api.whatsappbiz.com/v1/public/message/", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Basic ${process.env.WHATSAPP_API_TOKEN}`
    //       },
    //       body: JSON.stringify(payload)
    //     });

    //     if (!res.ok) {
    //       console.error(`WhatsApp API error: ${res.status} ${res.statusText}`);
    //       return false;
    //     }

    //     return true;
    //   } catch (err) {
    //     console.error("WhatsApp API request failed:", err.message);
    //     return false;
    //   }

    let whatsappSuccess = false;

    try {
        const whatsappRes = await fetch("https://api.whatsappbiz.com/v1/public/message/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${process.env.WHATSAPP_API_TOKEN}`
            },
            body: JSON.stringify(payload)
        });

        console.log("WhatsApp response status:", whatsappRes.status, whatsappRes.statusText);

        const whatsappData = await whatsappRes.json();
        console.log("WhatsApp API response:", whatsappData);

        whatsappSuccess = whatsappRes.ok;
    } catch (err) {
        console.error("WhatsApp API request failed:", err.message);
    }

    res.status(200).json({
        message: "Form submitted and email sent successfully!",
        whatsappSent: whatsappSuccess
    });

};

