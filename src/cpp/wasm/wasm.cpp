//parcel: -s EXPORTED_FUNCTIONS=['_ping'] -O3

extern "C"{
    const char* ping()
    {
        return "pong";
    }
}