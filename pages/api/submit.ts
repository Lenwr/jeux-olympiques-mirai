import {NextApiRequest, NextApiResponse} from "next";
import {google} from "googleapis"
import {myProd} from "@/constants";

type SheetForm = {
    date: any,
    name: string,
    chassis: string
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).send({message: 'Seul les requêtes POST sont autorisés'})
    }

    const body = req.body as SheetForm
    // Log to check if environment variables are accessible

    try {
        const auth = new google.auth.GoogleAuth(
            {
                credentials: {
                    client_email: myProd.GOOGLE_CLIENT_EMAIL,
                    private_key: myProd.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
                },
                scopes: [
                    'https://www.googleapis.com/auth/drive',
                    'https://www.googleapis.com/auth/drive.file',
                    'https://www.googleapis.com/auth/spreadsheets'
                ]
            }
        );
        const sheets = google.sheets({
            auth,
            version: 'v4'
        });
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: myProd.GOOGLE_SHEET_ID,
            range: 'A1:C1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [
                        body.date,
                        body.name,
                        body.chassis
                    ]
                ]
            }
        })
        return res.status(200).json({
            data: response.data
        })

    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'il y a une erreur'})
    }
}
