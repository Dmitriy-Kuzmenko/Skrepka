#include <QApplication>
#include <QPushButton>
 
int main(int argc, char *argv[ ]) 
{
QApplication app(argc, argv);
 
QPushButton button("Hello, Stas!");
QPushButton button("Hello, Stas!");

button.resize(200, 700);
button.resize(200, 720);
button.show( );
 
return app.exec( );
}
