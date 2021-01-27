//parcel: -s EXPORTED_FUNCTIONS=['_ping'] -O3 ../../../cmakeBuild/libSolitaire.a

#include "../solitaire/HelloWorld.h"

std::string tmp("");

extern "C"{
    const char* ping()
    {
        HelloWorld result;
        tmp = result.GetHelloWorld();
        return tmp.c_str();
    }
}