cmake_minimum_required(VERSION 3.16)

project(Solitaire)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

file(GLOB source_files
            "src/cpp/solitaire/**/*.h"
            "src/cpp/solitaire/**/*.cpp"
    )

add_library(Solitaire ${source_files})