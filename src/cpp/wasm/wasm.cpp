//parcel: -s EXPORTED_FUNCTIONS=['_ping','_init','_reset','_attemptMove'] -O3 ../../../cmakeBuild/libSolitaire.a

#include "../solitaire/HelloWorld.h"

std::string tmp("");

extern "C"{
    const char* ping()
    {
        HelloWorld result;
        tmp = result.GetHelloWorld();
        return tmp.c_str();
    }

    const char* init(const char* gameId)
    {
        // tmp = "24,1,2,3,4,5,6,7,0,0,0,0;c01c02c03c04c05c06c07c08c09c10c11c12c13d01d02d03d04d05d06d07d08d09d10d11d12d13h01h02h03h04h05h06h07h08h09h10h11h12h13s01s02s03s04s05s06s07s08s09s10s11s12s13";
        tmp = "13,13,13,13;c01c02c03c04c05c06c07c08c09c10c11c12c13d01d02d03d04d05d06d07d08d09d10d11d12d13h01h02h03h04h05h06h07h08h09h10h11h12h13s01s02s03s04s05s06s07s08s09s10s11s12s13";
        return tmp.c_str();
    }

    void reset()
    {

    }

    const char* attemptMove(const char* move)
    {
        tmp = move;
        return tmp.c_str();
    }
}