import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex flex-col h-full">
          <div className="text-center lg:text-right mb-6">
            <h1 className="font-bold text-gray-800 text-3xl sm:text-4xl xl:text-5xl mb-4">
              חבילת צילום מקצועית – מותאמת אישית
            </h1>
            
            <div className="text-gray-800 text-right">
              <h2 className="text-xl sm:text-2xl xl:text-3xl mb-3">מה תקבלו?</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base xl:text-lg">
                <li className="flex items-center justify-end bg-gray-50 p-3 rounded-lg">
                  <span className="ml-2 text-blue-500">•</span>
                  <span>צילום חוץ לבחירתכם</span>
                </li>
                <li className="flex items-center justify-end bg-gray-50 p-3 rounded-lg">
                  <span className="ml-2 text-blue-500">•</span>
                  <span>משך צילום: כשעה</span>
                </li>
                <li className="flex items-center justify-end bg-gray-50 p-3 rounded-lg">
                  <span className="ml-2 text-blue-500">•</span>
                  <span>100–150 תמונות כולל עריכה מקצועית</span>
                </li>
                <li className="flex items-center justify-end bg-gray-50 p-3 rounded-lg">
                  <span className="ml-2 text-blue-500">•</span>
                  <span>גלריה דיגיטלית באיכות גבוהה</span>
                </li>
                <li className="flex items-center justify-end bg-gray-50 p-3 rounded-lg">
                  <span className="ml-2 text-blue-500">•</span>
                  <span>יחס אישי, סבלני ומקצועי</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-auto flex flex-col items-center gap-4">
            <div className="bg-blue-50 rounded-xl p-4 w-full max-w-md">
              <p className="text-xl md:text-2xl font-bold text-blue-600 text-center">
                מחיר החבילה: 300 ₪ בלבד
              </p>
            </div>

            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
            >
              התחברות
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
